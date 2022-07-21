/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateBank = /* GraphQL */ `
  mutation UpdateBank($input: UpdateBankInput!) {
    updateBank(input: $input) {
      bank_name
      active
      formatted_bank_name
      ui_display_map
    }
  }
`;
export const createQuotas = /* GraphQL */ `
  mutation CreateQuotas($input: CreateQuotasInput!) {
    createQuotas(input: $input) {
      bank_name
      uuid
      completed
      date_group
      appi
      available
      available_both
      dwh_updated_time_utc
      branch_name
      Methodology
      sent
      survey_type
      Goal
    }
  }
`;
export const updateQuotas = /* GraphQL */ `
  mutation UpdateQuotas($input: UpdateQuotasInput!) {
    updateQuotas(input: $input) {
      bank_name
      uuid
      completed
      date_group
      appi
      available
      available_both
      dwh_updated_time_utc
      branch_name
      Methodology
      sent
      survey_type
      Goal
    }
  }
`;
export const deleteQuotas = /* GraphQL */ `
  mutation DeleteQuotas($input: DeleteQuotasInput!) {
    deleteQuotas(input: $input) {
      bank_name
      uuid
      completed
      date_group
      appi
      available
      available_both
      dwh_updated_time_utc
      branch_name
      Methodology
      sent
      survey_type
      Goal
    }
  }
`;
export const createInterviews = /* GraphQL */ `
  mutation CreateInterviews($input: CreateInterviewsInput!) {
    createInterviews(input: $input) {
      bank_name
      external_data_id
      form_data
      updated_count
      updated_timestamp
      survey_date_submitted
      selected
    }
  }
`;
export const updateInterviews = /* GraphQL */ `
  mutation UpdateInterviews($input: UpdateInterviewsInput!) {
    updateInterviews(input: $input) {
      bank_name
      external_data_id
      form_data
      updated_count
      updated_timestamp
      survey_date_submitted
      selected
    }
  }
`;
export const deleteInterviews = /* GraphQL */ `
  mutation DeleteInterviews($input: DeleteInterviewsInput!) {
    deleteInterviews(input: $input) {
      bank_name
      external_data_id
      form_data
      updated_count
      updated_timestamp
      survey_date_submitted
      selected
    }
  }
`;
