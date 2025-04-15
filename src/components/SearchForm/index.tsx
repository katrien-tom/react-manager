import { Form, Space, Button } from 'antd'
/**
 * 搜索表单容器组件封装
 * @param props
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SearchForm(props: any) {
  return (
    <Form className='searchForm' form={props.form} layout='inline' initialValues={props.initialValues}>
      {props.children}
      <Form.Item>
        <Space>
          <Button type='primary' onClick={props.submit}>
            搜索
          </Button>
          <Button type='default' onClick={props.reset}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
