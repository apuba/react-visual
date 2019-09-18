import React from 'react'
import useForm from 'react-hook-form' // 引入hookForm 表单校验
import { Icon, Tooltip, Button, Modal, Input, message } from 'antd'
import * as validate from '../../../commons/validate'
import _ from 'lodash'
const { confirm } = Modal

const btnSaveDataSource = () => {

}

const modalCancelHandle =() => {

}

const modalAddHandle =() => {

}

const changeInputHandle =() => {

}

const focusHandle =() => {

}

const btnRemoveDataSourceItem = () => {
  
}

function StaticDataSource(props) {
  const { register, handleSubmit, errors } = useForm() // 引入 hookform 表单校验
  return (
    <Modal
          title={props.state.modalTitle}
          visible={props.state.modalShow}
          onOk={btnSaveDataSource.bind(this)}
          onCancel={modalCancelHandle.bind(this)}
          maskClosable={false}
          footer={props.state.modalAction ==='add' ? null: [
            <Button key='add' onClick={modalAddHandle.bind(this)} icon='plus'>
              增加
            </Button>,
            <Button key='submit' type='primary' onClick={btnSaveDataSource.bind(this)}>
              确定
            </Button>
          ]}
        >
          <div className='page_designer_datasource_list'>
            {
              props.state.modalAction === 'add' &&
              <form style={{ margin: '0 auto' }} className='formvalidate'>
              <span className='ant-input-group-wrapper' style={{ width: '70%', marginRight: '15px' }} >
                <span className='ant-input-wrapper ant-input-group'>
                  <span className='ant-input-group-addon'>数据源名称</span>
                  <input name='name' className={'ant-input ' + (errors.name ? 'error' : '')}
                    ref={register({ required: true })}
                    onChange={e => props.changeInputHandle({}, e, props.me)} />
                </span>
              </span>
              <Button type='primary' onClick={handleSubmit(props.submi(props.me))} >下步</Button>
            </form>
            }
            {
              props.state.modalAction === 'edit' && props.state.dataSourceList.map((item, index) => {
                return (
                  <div className='page_designer_datasource_item' key={index}>
                    <Input addonBefore='值' name='key' className='page_designer_datasource_input' ref={'key'+ index}
                     onPressEnter={focusHandle.bind(this, 'value', index)} onChange={changeInputHandle.bind(this, item)} value={item.key} key={props.state.dataSourceType + 'key' + index} />
                    <span className='page_designer_datasource_symbol'> = </span>
                    <Input addonBefore='名称' name='value' ref={'value'+ index} className='page_designer_datasource_input' 
                    onPressEnter={focusHandle.bind(this, 'key', index +1)} onChange={changeInputHandle.bind(this, item)} value={item.value} key={props.state.dataSourceType + 'value' + index} />
                    {index > 0 &&
                      <Tooltip title='删除当前条目'>
                        <Button type='primary' shape='circle' size='small' icon='minus' className='page_designer_datasource_del' onClick={(e) => btnRemoveDataSourceItem(item, index)} />
                      </Tooltip>
                    }
                  </div>
                )
              })
            }
          </div>
        </Modal>
  )
}

export default StaticDataSource
