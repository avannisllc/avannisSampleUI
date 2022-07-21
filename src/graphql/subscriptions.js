/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateBank = /* GraphQL */ `
  subscription OnUpdateBank(
    $bank_name: String
    $active: Boolean
    $formatted_bank_name: String
  ) {
    onUpdateBank(
      bank_name: $bank_name
      active: $active
      formatted_bank_name: $formatted_bank_name
    ) {
      bank_name
      active
      formatted_bank_name
      ui_display_map
    }
  }
`;
export const onCreateQuotas = /* GraphQL */ `
  subscription OnCreateQuotas(
    $bank_name: String
    $uuid: String
    $completed: Int
    $date_group: String
    $appi: String
  ) {
    onCreateQuotas(
      bank_name: $bank_name
      uuid: $uuid
      completed: $completed
      date_group: $date_group
      appi: $appi
    ) {
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
export const onUpdateQuotas = /* GraphQL */ `
  subscription OnUpdateQuotas(
    $bank_name: String
    $uuid: String
    $completed: Int
    $date_group: String
    $appi: String
  ) {
    onUpdateQuotas(
      bank_name: $bank_name
      uuid: $uuid
      completed: $completed
      date_group: $date_group
      appi: $appi
    ) {
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
export const onDeleteQuotas = /* GraphQL */ `
  subscription OnDeleteQuotas(
    $bank_name: String
    $uuid: String
    $completed: Int
    $date_group: String
    $appi: String
  ) {
    onDeleteQuotas(
      bank_name: $bank_name
      uuid: $uuid
      completed: $completed
      date_group: $date_group
      appi: $appi
    ) {
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
export const onCreateInterviews = /* GraphQL */ `
  subscription OnCreateInterviews(
    $bank_name: String
    $external_data_id: String
    $form_data: String
    $updated_count: Int
    $updated_timestamp: String
  ) {
    onCreateInterviews(
      bank_name: $bank_name
      external_data_id: $external_data_id
      form_data: $form_data
      updated_count: $updated_count
      updated_timestamp: $updated_timestamp
    ) {
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
export const onUpdateInterviews = /* GraphQL */ `
  subscription OnUpdateInterviews(
    $bank_name: String
    $external_data_id: String
    $form_data: String
    $updated_count: Int
    $updated_timestamp: String
  ) {
    onUpdateInterviews(
      bank_name: $bank_name
      external_data_id: $external_data_id
      form_data: $form_data
      updated_count: $updated_count
      updated_timestamp: $updated_timestamp
    ) {
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
export const onDeleteInterviews = /* GraphQL */ `
  subscription OnDeleteInterviews(
    $bank_name: String
    $external_data_id: String
    $form_data: String
    $updated_count: Int
    $updated_timestamp: String
  ) {
    onDeleteInterviews(
      bank_name: $bank_name
      external_data_id: $external_data_id
      form_data: $form_data
      updated_count: $updated_count
      updated_timestamp: $updated_timestamp
    ) {
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
