import React from 'react'
import { withFormik } from 'formik'
import * as yup from 'yup'

import Form from './base/form'
import WithTranslation from '../hocs/with_translation'

const sections = [
  {
    rows: [
      {
        fields: [
          {
            id: `name`,
            name: `name`,
            type: `text`,
            component: `input`
          },
          {
            id: `email`,
            name: `email`,
            type: `email`,
            component: `input`
          }
        ]
      },
      {
        fields: [
          {
            id: `message`,
            name: `message`,
            component: `textarea`
          }
        ]
      }
    ]
  }
]

const ContactUs = ({ t, _i18n, ...formikProps }) => {
  return (
    <Form
      formProps={{
        id: `contact-us__form`,
        classNames: [`form form_modal`]
      }}
      buttonClasses={[`form__button_full-width`, `form__button_modal`]}
      sections={sections}
      content={{ button: t(`contact.button`) }}
      formikProps={formikProps}
    />
  )
}

const createContactSchema = (t) => {
  const nameMinLength = 2
  const messageMinLength = 10

  return yup.object().shape({
    name: yup
      .string()
      .min(nameMinLength, t(`validation.min`, { length: nameMinLength })),
    email: yup
      .string()
      .email(t(`validation.email`))
      .required(t(`validation.email_required`)),
    message: yup
      .string()
      .min(messageMinLength, t(`validation.message_min`, { length: messageMinLength }))
      .required(t(`validation.message_required`))
  })
}

const ContactUsEnhanced = withFormik({
  mapPropsToValues: () => ({
    name: ``,
    email: ``,
    message: ``
  }),
  validationSchema: ({ t }) => createContactSchema(t),
  handleSubmit: (_values, { resetForm }) => {
    window.alert(`Let's pretend its sent!`)
    resetForm()
  }
})(ContactUs)

export default () => (
  <WithTranslation
    namespaces={[`forms`]}
    component={ContactUsEnhanced}
  />
)
