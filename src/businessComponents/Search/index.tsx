import React, { PureComponent } from 'react'
import SinglePage, { SingleProps } from './Single'
import GroupPage, { GroupProps } from './Group'

export type Type = 'single' | 'group'
class Search extends PureComponent<{ type?: Type } & (SingleProps | GroupProps)> {
  render() {
    const { type = 'single', ...restProps } = this.props
    return type === 'single'
      ? <SinglePage {...restProps as SingleProps} />
      : <GroupPage {...restProps as GroupProps} />
  }
}

export default Search
