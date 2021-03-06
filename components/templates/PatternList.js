

import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Grid, Row, Col, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import GroupPatterns from '../organisms/GroupPatterns'

import { Link } from '../../tools/routes'
import data from '../../static/pages/index'
import { setJSON, getPath } from '../../tools/store/json'

const currentPatternGroupPath = 'app.global.current.patternGroup'

const Index = (props) => {
  const { dispatch, currentPatternGroup, t } = props
  const setCurrentPatternGroup = (g) => {
    if (currentPatternGroup && currentPatternGroup.key === g.key) {
      dispatch(setJSON(null, currentPatternGroupPath))
      return
    }
    dispatch(setJSON(g, currentPatternGroupPath))
  }
  return (<div className="row">
    <Grid>
      <Row>
        <Col xs={4} md={4}>
          <ListGroup>
            {data.patternGroups.map((patternGroup) => {
              return (currentPatternGroup && currentPatternGroup.key === patternGroup.key) ?
                <ListGroupItem key={patternGroup.key} header={patternGroup.title} onClick={
                  () => setCurrentPatternGroup(patternGroup)
                }>{t(patternGroup.description)}</ListGroupItem> :
                <ListGroupItem key={patternGroup.key} onClick={
                  () => setCurrentPatternGroup(patternGroup)
                }>{patternGroup.title}</ListGroupItem>
            })}
          </ListGroup>
        </Col>
        <Col xs={8} md={8}>
          {!!currentPatternGroup && <GroupPatterns group={currentPatternGroup} />}
        </Col>
      </Row>
    </Grid>
  </div>
  )
}

export default connect(state => {
  return {
    currentPatternGroup: getPath(state, currentPatternGroupPath),
  }
})(translate(['index'])(Index))