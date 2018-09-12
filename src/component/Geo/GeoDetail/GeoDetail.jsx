import * as React from 'react'

import type {State} from '../../../type/GeoType';

type Props = {
  geo: State
}

const GeoDetail = ({geo}:Props) => {
  return <h1>{geo.display}</h1>
}

export default GeoDetail
