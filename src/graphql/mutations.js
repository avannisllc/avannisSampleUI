/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBank = /* GraphQL */ `
  mutation CreateBank($input: CreateBankInput!) {
    createBank(input: $input) {
      bank_name
      formatted_bank_name
      active
      ui_display_map
    }
  }
`;
export const updateBank = /* GraphQL */ `
  mutation UpdateBank($input: UpdateBankInput!) {
    updateBank(input: $input) {
      bank_name
      formatted_bank_name
      active
      ui_display_map
    }
  }
`;
export const deleteBank = /* GraphQL */ `
  mutation DeleteBank($input: DeleteBankInput!) {
    deleteBank(input: $input) {
      bank_name
      formatted_bank_name
      active
      ui_display_map
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
export const createQuotas = /* GraphQL */ `
  mutation CreateQuotas($input: CreateQuotasInput!) {
    createQuotas(input: $input) {
      Goal
      Methodology
      qppi
      available
      available_both
      bank_name
      branch_name
      completed
      date_group
      dwh_updated_time_utc
      sent
      survey_type
      uuid
    }
  }
`;
export const updateQuotas = /* GraphQL */ `
  mutation UpdateQuotas($input: UpdateQuotasInput!) {
    updateQuotas(input: $input) {
      Goal
      Methodology
      qppi
      available
      available_both
      bank_name
      branch_name
      completed
      date_group
      dwh_updated_time_utc
      sent
      survey_type
      uuid
    }
  }
`;
export const deleteQuotas = /* GraphQL */ `
  mutation DeleteQuotas($input: DeleteQuotasInput!) {
    deleteQuotas(input: $input) {
      Goal
      Methodology
      qppi
      available
      available_both
      bank_name
      branch_name
      completed
      date_group
      dwh_updated_time_utc
      sent
      survey_type
      uuid
    }
  }
`;
