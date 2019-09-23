import React from 'react';
import useForm from 'react-hook-form'; // 引入hookForm 表单校验
import { Button } from 'antd';

function NewDataSourceFrom(props) {
  const { register, handleSubmit, errors } = useForm(); // 引入 hookform 表单校验
  return (
    <form
      className="formvalidate"
      style={{ margin: '0 auto' }}
    >
      <span
        className="ant-input-group-wrapper"
        style={{ width: '70%', marginRight: '15px' }}
      >
        <span className="ant-input-wrapper ant-input-group">
          <span className="ant-input-group-addon">数据源名称</span>
          <input
            className={'ant-input ' + (errors.name ? 'error' : '')}
            name="name"
            onChange={e => props.changeInputHandle({}, e, props.me)}
            ref={register({ required: true })}
          />
        </span>
      </span>
      <Button
        onClick={handleSubmit(props.submit.bind(this, props.me))}
        type="primary"
      >
        下步
      </Button>
    </form>
  );
}

export default NewDataSourceFrom;
