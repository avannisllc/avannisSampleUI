/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBank = /* GraphQL */ `
  query GetBank($bank_name: String!) {
    getBank(bank_name: $bank_name) {
      bank_name
      formatted_bank_name
      active
      ui_display_map
      dupefields
    }
  }
`;
export const listBanks = /* GraphQL */ `
  query ListBanks(
    $filter: TableBankFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBanks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        bank_name
        formatted_bank_name
        active
        ui_display_map
        dupefields
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
export const getQuotas = /* GraphQL */ `
  query GetQuotas($bank_name: String!, $uuid: String!) {
    getQuotas(bank_name: $bank_name, uuid: $uuid) {
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
export const listQuotas = /* GraphQL */ `
  query ListQuotas(
    $filter: TableQuotasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuotas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
