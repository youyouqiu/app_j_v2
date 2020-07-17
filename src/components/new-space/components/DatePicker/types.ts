import moment from 'moment'

export type DateType = moment.Moment | string
export type EnableDate = [DateType, DateType]
export type DefaultValue = [DateType, DateType]
export type DateMoment = [moment.Moment, moment.Moment]
export type DateString = [string, string]
