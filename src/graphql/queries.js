/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listBanks = /* GraphQL */ `
  query ListBanks(
    $filter: TableBankFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBanks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        bank_name
        active
        formatted_bank_name
        ui_display_map
      }
      nextToken
    }
  }
`;
export const listQuotas = /* GraphQL */ `
  query ListQuotas(
    $filter: TableQuotasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuotas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        bank_name
        uuid
        completed
        date_group
        appi
        qppi
        available
        available_both
        dwh_updated_time_utc
        branch_name
        Methodology
        sent
        survey_type
        Goal
      }
      nextToken
    }
  }
`;
export const getInterviews = /* GraphQL */ `
  query GetInterviews($bank_name: String!, $external_data_id: String!) {
    getInterviews(bank_name: $bank_name, external_data_id: $external_data_id) {
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
export const listInterviews = /* GraphQL */ `
  query ListInterviews(
    $filter: TableInterviewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInterviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        bank_name
        external_data_id
        form_data
        updated_count
        updated_timestamp
        survey_date_submitted
        selected
      }
      nextToken
    }
  }
`;
export const updateInterviews = /* GraphQL */ `
mutation updateInterviews(
  $bank_name: String!
  ) {
    bank_name
    external_data_id
    selected
    form_data
    survey_date_submitted
    updated_count
    updated_timestamp
  }
`;
export const onUpdateQuotas = /* GraphQL */ `
subscriptions onUpdateQuotas(
    $bank_name: String
    ) {
      Goal
      Methodology
      available
      appi
      available_both
      bank_name
      branch_name
      completed
      date_group
      dwh_updated_time_utc
      qppi
      sent
      survey_type
      uuid
  }
`;