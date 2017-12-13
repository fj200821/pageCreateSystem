import React, {Component} from 'react';
import {Upload,Icon,Button,message} from 'antd';
import axios from 'axios';


class upload extends Component{
    constructor(props){
        super(props);
        this.state={
            fileList:[],
            uploading:false
        }
    }

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });
        this.setState({
            uploading: true,
        });
        let reader = new FileReader();
        reader.onload = ()=>{
            this.save(reader.result,(data)=>{
                this.setState({
                    uploading: false,
                    fileList:[]
                });
                this.props.callback && this.props.callback(data);
            })
        };
        reader.readAsDataURL(fileList[0]);
    }

    save = (data,callback) => {
        axios.request({
            url: "//crmpre.adbaitai.com/api/fileUpload/ajaxImageUploadBase64.action",
            method: 'post',
            data: data,
            withCredentials: true,
            headers: {"Content-Type": "text/plain"},
        }).then(function (res) {
            callback(res.data);
        }).catch(function(error){
            message.error(error.message);
        })
    }


    render(){
        const { uploading } = this.state;
        const props = {
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        };

        return (
            <div style={{display:"flex"}}>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> 修改图片
                    </Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={this.state.fileList.length === 0}
                    loading={uploading}
                    style={{"marginLeft":"10px"}}
                >{uploading ? 'Uploading' : '上传' }
                </Button>
            </div>
        )
    }
}

export default upload;