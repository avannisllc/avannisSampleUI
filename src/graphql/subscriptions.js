/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBank = /* GraphQL */ `
  subscription OnCreateBank(
    $bank_name: String
    $formatted_bank_name: String
    $active: Boolean
    $ui_display_map: String
  ) {
    onCreateBank(
      bank_name: $bank_name
      formatted_bank_name: $formatted_bank_name
      active: $active
      ui_display_map: $ui_display_map
    ) {
      bank_name
      formatted_bank_name
      active
      ui_display_map
    }
  }
`;
export const onUpdateBank = /* GraphQL */ `
  subscription OnUpdateBank(
    $bank_name: String
    $formatted_bank_name: String
    $active: Boolean
  ) {
    onUpdateBank(
      bank_name: $bank_name
      formatted_bank_name: $formatted_bank_name
      active: $active
    ) {
      bank_name
      formatted_bank_name
      active
      ui_display_map
    }
  }
`;
export const onDeleteBank = /* GraphQL */ `
  subscription OnDeleteBank(
    $bank_name: String
    $formatted_bank_name: String
    $active: Boolean
    $ui_display_map: String
  ) {
    onDeleteBank(
      bank_name: $bank_name
      formatted_bank_name: $formatted_bank_name
      active: $active
      ui_display_map: $ui_display_map
    ) {
      bank_name
      formatted_bank_name
      active
      ui_display_map
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
    $survey_date_submitted: String
  ) {
    onUpdateInterviews(
      bank_name: $bank_name
      external_data_id: $external_data_id
      form_data: $form_data
      updated_count: $updated_count
      survey_date_submitted: $survey_date_submitted
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
export const onCreateQuotas = /* GraphQL */ `
  subscription OnCreateQuotas(
    $qppi: String
    $bank_name: String
    $completed: Int
    $date_group: String
    $uuid: String
  ) {
    onCreateQuotas(
      qppi: $qppi
      bank_name: $bank_name
      completed: $completed
      date_group: $date_group
      uuid: $uuid
    ) {
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
export const onUpdateQuotas = /* GraphQL */ `
  subscription OnUpdateQuotas(
    $qppi: String
    $bank_name: String
    $completed: Int
    $date_group: String
    $uuid: String
  ) {
    onUpdateQuotas(
      qppi: $qppi
      bank_name: $bank_name
      completed: $completed
      date_group: $date_group
      uuid: $uuid
    ) {
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
export const onDeleteQuotas = /* GraphQL */ `
  subscription OnDeleteQuotas(
    $qppi: String
    $bank_name: String
    $completed: Int
    $date_group: String
    $uuid: String
  ) {
    onDeleteQuotas(
      qppi: $qppi
      bank_name: $bank_name
      completed: $completed
      date_group: $date_group
      uuid: $uuid
    ) {
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
