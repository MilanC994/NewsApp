import _ from 'lodash'

export const createLoadingSelector = (actions) => (state) => _(actions).some((action) => _.get(state, `loading.${action}`))

export const createErrorMessageSelector = (actions) => (state) => _(actions)
  .map((action) => _.get(state, `error.${action}`))
  .compact()
  .first()
