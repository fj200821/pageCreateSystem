/**
 * @authors tanqichao
 * @date    2017-06-20 13:59:27
 * @module  高级设置 - 投放时段
 */

import { Radio, Modal, Button, message } from 'antd';
import React, { Component, PropTypes } from 'react';
import './index.less';

const RadioGroup = Radio.Group;

class Media extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            visible: false
        }
    }

    // 改变元素状态
    changeState = (e) => {
        e.className = e.className === 'active' ? '' : 'active'
    }

    // 点击事件
    handleClick = (e) => {
        if (this.state.status) {
            this.changeState(e.target)
        }
    }

    // 鼠标按下事件
    handleMouseDown = (e) => {
        this.setState({status: true})
        this.changeState(e.target)
    }

    // 鼠标抬起事件
    handleMouseUp = () => {
        this.setState({status: false})
    }

    // 鼠标移动事件
    handleMouseMove = (e) => {
        if (this.state.status) {
            this.changeState(e.target)
        }
    }

    handleMouseOut = (e) => {
        this.setState({status: false})
    }

    showTimer = () => {
        let isSelect = false
        const { periodList, onComplete } = this.props

        // 关闭弹窗
        const hide = () => {
            this.setState({visible: false})
        }

        // 确认所选时间
        const handleOk = () => {
            const result = ['', '', '', '', '', '', '']
            const eles = this.refs.eleDD.getElementsByTagName('dd')

            for (let i = 0; i < eles.length; i ++) {
                let n = parseInt(i/24)

                if (eles[i].className === 'active') {
                    isSelect = true
                    result[n] += '1'
                } else {
                    result[n] += '0'
                }
            }

            if (!isSelect) {
                message.error('请选择投放时间段')
                return ;
            }

            this.props.onComplete(result)
            this.setState({visible: false})
        }

        // 取消所有选择
        const handleCancel = () => {
            const eles = this.refs.eleDD.getElementsByTagName('dd')

            for (let i = 0; i < eles.length; i ++) {
                if (eles[i].className === 'active') {
                    eles[i].className = ''
                }
            }
        }

        // 渲染所有可选时间点
        const eles = (n) => {
            const content = []

            for (var i = 0; i < 24; i++) {
                content.push(<dd
                    key={i}
                    className={periodList.length && periodList[n].split('')[i] === '1' ? 'active' : ''}
                    onClick={this.handleClick}
                    onMouseUp={this.handleMouseUp}
                    onMouseDown={this.handleMouseDown}
                    onMouseOver={this.handleMouseMove}
                ></dd>)
            }

            return content
        }

        const handleMousemove = (e) => {
            if (e.target.nodeName !== 'DD') {
                this.setState({status: false})
            }
        }

        return (
            <Modal
                title="投放时段"
                width={526}
                onCancel={hide}
                maskClosable={false}
                visible={this.state.visible}
                footer={[
                  <Button key="submit" type="primary" onClick={handleOk}>确定选择</Button>,
                  <Button key="cancel" onClick={handleCancel}>撤销所有选择</Button>
                ]}
            >
              <div className="time" onMouseMove={handleMousemove}>
                <div className="time-header-tip">单击方格【可选中/取消时间点】，单击拖动方格【可选中/取消某一连续时间段】</div>
                <div className="time-header">
                  <div className="time-header-nav">
                    <b>时间</b>
                    <b>星期</b>
                  </div>
                  <div className="time-header-ele">
                    <dl>
                      <dt>上午</dt>
                      <dd>0</dd><dd>1</dd><dd>2</dd><dd>3</dd><dd>4</dd><dd>5</dd><dd>6</dd><dd>7</dd><dd>8</dd><dd>9</dd><dd>10</dd><dd>11</dd>
                    </dl>
                    <dl>
                      <dt>下午</dt>
                      <dd>12</dd><dd>13</dd><dd>14</dd><dd>15</dd><dd>16</dd><dd>17</dd><dd>18</dd><dd>19</dd><dd>20</dd><dd>21</dd><dd>22</dd><dd>23</dd>
                    </dl>
                  </div>
                </div>
                <div className="time-body" ref="eleDD">
                  <dl><dt>星期一</dt>{eles(0)}</dl>
                  <dl><dt>星期二</dt>{eles(1)}</dl>
                  <dl><dt>星期三</dt>{eles(2)}</dl>
                  <dl><dt>星期四</dt>{eles(3)}</dl>
                  <dl><dt>星期五</dt>{eles(4)}</dl>
                  <dl><dt>星期六</dt>{eles(5)}</dl>
                  <dl><dt>星期日</dt>{eles(6)}</dl>
                </div>
              </div>
            </Modal>
        )
    }

    render() {
        const { periodList, action, onComplete } = this.props

        const modify = () => {
            this.setState({visible: true})
        }

        const handleChange = (e) => {
            const checked = e.target.value

            if (checked === 1) {
                onComplete([])
            }
            this.setState({
                visible: checked === 2 ? true : false
            })
        }

        return (
            <span>
        <RadioGroup
            onChange={handleChange}
            value={periodList && !!periodList.length ? 2 : 1}
        >
          <Radio value={1}>全天候屏蔽</Radio>
          <Radio value={2}>指定时段</Radio>
        </RadioGroup>
                {periodList && !!periodList.length ? <a onClick={modify}>更改</a> : null}
                {this.showTimer()}
      </span>
        )
    }
}

export default Media;
