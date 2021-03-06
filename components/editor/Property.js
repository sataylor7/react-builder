import { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Button } from 'react-bootstrap'

import { setJSON, getPath, pathMerge } from '../../tools/store/json'
import { tagTypes, currentEditorFakeTagRootPath, currentEditorFakeTagRelativePath } from './define'
import getTagEditor from './tags'
import TagSelectModal from './TagSelectModal'
import LogicEdit from './tags/logic'

class Property extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { path, root, dispatch } = this.props
    const pathData = getPath(root, path) || {}
    const TagEditor = getTagEditor(pathData.tag, pathData.type)
    const onChange = (k, v) => {
      const newRoot = pathMerge(root, path ? `${path}.${k}` : k, v)
      return dispatch(setJSON(newRoot, currentEditorFakeTagRootPath))
    }
    const onDelete = () => {
      dispatch(setJSON(undefined, currentEditorFakeTagRelativePath))
      const parentPathArr = path.split('.')
      const index = parseInt(parentPathArr.pop())
      const parentPath = parentPathArr.join('.')
      const parentObj = getPath(root, parentPath)
      parentObj.splice(index, 1)
      const newParentObj = [...parentObj]
      const newRoot = pathMerge(root, parentPath, newParentObj)
      dispatch(setJSON(newRoot, currentEditorFakeTagRootPath))
    }

    const { logic = '', tag = '' } = pathData

    return (<Panel header={`Element Path: /${path}`}>
      <TagEditor onChange={onChange} tagData={pathData} />
      {!!path && (<div>
        {tag !== 'text' && <div>
          <hr />
          <p>logic:</p>
          <LogicEdit logic={logic} onChange={onChange} />
        </div>}
        <hr />
        <Button onClick={onDelete}>delete</Button>
      </div>)}

      {!path && (<div>
        <hr />
        <Button onClick={() => this.tagSelect.show({ filterType: 'container' }).then((obj) => {
          console.log(obj, pathData)
          onChange(path, {
            ...pathData,
            ...obj,
          })
        }).catch(() => { })}>change tag</Button>
        <TagSelectModal ref={(tagSelect) => this.tagSelect = tagSelect} />
      </div>)}
    </Panel>)
  }
}

export default connect((state) => {
  return {
    root: getPath(state, currentEditorFakeTagRootPath) || {
      type: tagTypes.container,
      tag: 'div',
      path: ''
    },
    path: getPath(state, currentEditorFakeTagRelativePath) || '',
  }
})(Property)