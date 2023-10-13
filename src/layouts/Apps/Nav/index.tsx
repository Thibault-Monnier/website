import { usePathname } from "next/navigation"
import * as React from "react"

import useSticky from "@hooks/client/useSticky"
import { AppsYaml } from "@layouts/Apps/types"
import { remIntoPixels } from "@utils/dom"
import { Language } from "@utils/locales"
import { appsCategoryPath, appsPath } from "@utils/paths"
import { sizes } from "@utils/styles"
import { useOnClickOutside } from "@hooks/client/useOnClickOutside"
import useTranslation from "@hooks/client/useTranslation"

import {
  StyledNav,
  StyledLink,
  Container,
  CategoryFitlerWrapper,
  CategoryFitler,
  CategoryList,
  CategoryItem,
  ArrowIcon,
  SearchWrapper,
  Input,
  SearchIcon,
} from "./Styles"

interface NavProps {
  language: Language
  categories: AppsYaml["content"]["categories"]
  allAppsLabel: string
  onSearchInputChange: (value: string) => void
}

const Index = ({ language, categories, allAppsLabel, onSearchInputChange }: NavProps): JSX.Element => {
  const currentPath = usePathname()
  const allAppsPath = appsPath(language)
  const [isExpanded, setIsExpanded] = React.useState(false)

  const currentCategory = React.useMemo(() => {
    const lastSlashIndex = currentPath.lastIndexOf("/")
    const lastSlashString = currentPath.substring(lastSlashIndex + 1)

    if (lastSlashString === "apps") {
      return allAppsLabel
    }

    return (lastSlashString.charAt(0).toUpperCase() + lastSlashString.slice(1)).replaceAll("-", " ")
  }, [])

  const $navRef = React.useRef<HTMLDivElement>(null)
  const $categoryListRef = useOnClickOutside(() => {
    setIsExpanded(false)
  })
  const headerHeightInPixels = React.useMemo(() => remIntoPixels(sizes.headerHeight), [])
  const isSticky = useSticky($navRef, headerHeightInPixels)

  const { t } = useTranslation()

  const link = (path: string, isActive: boolean, label: string) => (
    <StyledLink href={path + "#nav"} $isActive={isActive} $isSticky={isSticky}>
      {label}
    </StyledLink>
  )

  return (
    <>
      {/* Static div for anchor linking; required because anchors don't work on sticky elements. */}
      <div id="nav" />

      <StyledNav ref={$navRef} $isSticky={isSticky}>
        <Container>
          <SearchWrapper>
            <SearchIcon code="search" />
            <Input
              placeholder={t("apps.search_input_placeholder")}
              onChange={(e) => {
                onSearchInputChange(e.target.value)
              }}
            ></Input>
          </SearchWrapper>
          <CategoryFitlerWrapper ref={$categoryListRef}>
            <CategoryFitler onClick={() => setIsExpanded((v) => !v)}>
              {currentCategory}
              <ArrowIcon code={isExpanded ? "expand_less" : "expand_more"} />
            </CategoryFitler>

            <CategoryList $isExpanded={isExpanded}>
              <CategoryItem>{link(allAppsPath, allAppsPath === currentPath, allAppsLabel)}</CategoryItem>
              {categories.map((category, idx) => {
                const path = appsCategoryPath(language, category.title)
                return <CategoryItem key={idx}>{link(path, path === currentPath, category.title)}</CategoryItem>
              })}
            </CategoryList>
          </CategoryFitlerWrapper>
        </Container>
      </StyledNav>
    </>
  )
}

export default Index
