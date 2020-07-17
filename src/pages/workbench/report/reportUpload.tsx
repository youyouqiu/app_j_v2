import React, {Component} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {Toast} from '@new-space/teaset';

// 工具
import {scaleSize} from '../../../utils/screenUtil';

// 组件
import ImagePicker from '../../../components/ImagePicker';
import PhotosPreView from '../../../businessComponents/photosPreView';

// 样式
import {STYLE} from './style';
// @ts-ignore
import UUIDGenerator from 'react-native-uuid-generator';
class ReportUpload extends Component<any> {
	state:any={}
	constructor(props: any) {
		super(props);

		this.state = {
			visible: false, // 上传组件显示状态
			reportId: '', // 报备 id
			imageList: [], // 图片列表
			previewVisible: false, // 预览组件显示状态
            currIndex: 0, // 当前预览
		}
	}

	componentDidMount() {
		setTimeout(() => {
			let {reportId} = this.props;
			let newReportId = reportId || '';

			if (reportId) {
				this.setState({
					reportId: newReportId,
				})
			}
		}, 500)
	}

	// 激活上传
	uploadImage = () => {
		console.log('激活上传');

		this.setState({
			visible: true,
		})
	}

	// 关闭上传
	onClose = () => {
		console.log('关闭上传')

		this.setState({
			visible: false,
		})
	}

	// 上传成功
	onSuccess = async (file: any) => {
		try {
            console.log('上传成功', file)

            let {imageList} = this.state;
            let {getImagesList} = this.props;
            const fileGuid = await UUIDGenerator.getRandomUUID();
            imageList.push(Object.assign({}, {
                fileUrl: (file || {}).extension || '',
                uri: ((file || {}).file || {}).path || '',
                fileName: ((file || {}).file || {}).name || '',
                fileGuid: fileGuid,
            }));

            this.setState({
                imageList,
            }, () => {
                getImagesList(imageList);
            })
        } catch (e) {

        }
	}

	// 删除图片
	onDeleteImage = (imgId: string) => {
		console.log('删除图片')

		let {imageList} = this.state;
		let newImageList = imageList.concat();
		let {getImagesList} = this.props;

		imageList.map((item:any, index:any) => {
			if (item.fileGuid === imgId) {
				newImageList.splice(index, 1)
			}
		})

		this.setState({
			imageList: newImageList,
		}, () => {
			getImagesList(newImageList);
		})
	}

	// 预览图片
	onPreviewImage = (item: any, index: number) => {
		console.log('预览图片')

		this.setState({
			previewVisible: true,
            currIndex: index || 0
		})
	}

	// 关闭预览
	onPreviewClose = () => {
		console.log('关闭预览')

		this.setState({
			previewVisible: false,
		})
	}

	render() {
		let {visible, reportId, imageList, previewVisible, currIndex} = this.state;

		console.log(imageList, 'imageList')

		return (
			<View>
				<View style={{display: 'flex', flexDirection: 'row'}}>
                    {
                        (imageList || []).length < 2 ? <View>
                            <TouchableOpacity
                                style={STYLE.imgUploadWarp}
                                activeOpacity={0.8}
                                onPress={() => {(imageList || []).length <2 ? this.uploadImage() : null}}
                            >
                                <Image
                                    style={{width: scaleSize(32), height: scaleSize(32)}}
                                    source={require('../../../images/icons/updata2.png')}
                                />
                                <Text style={STYLE.imgUploadText}>上传图片</Text>
                            </TouchableOpacity>
                        </View> : null
                    }


					<View style={{display: 'flex', flexDirection: 'row'}}>
						{
							(imageList || []).map((item: any, index: number) => {
								return (
									<View
										style={STYLE.imgPreviewWarp}
										key={index}
									>
										<TouchableOpacity
											style={STYLE.imgDelete}
											activeOpacity={0.8}
											onPress={() => {this.onDeleteImage(item.fileGuid)}}
										>
											<Image
												style={{width: scaleSize(35), height: scaleSize(35)}}
												source={require('../../../images/icons/closed2.png')}
											/>
										</TouchableOpacity>
										<TouchableOpacity
											style={{}}
											activeOpacity={0.8}
											onPress={() => {this.onPreviewImage(item, index)}}
										>
											<Image
												style={STYLE.imgPreview}
												source={{uri: (item || {}).uri}}
											/>
										</TouchableOpacity>
									</View>
								)
							})
						}
					</View>
				</View>

				<View>
					<PhotosPreView
                        index={currIndex}
						fileList={imageList}
						visible={previewVisible}
						onClose={this.onPreviewClose}
					/>

					<ImagePicker
						visible={visible}
						onClose={this.onClose}
						onSuccess={this.onSuccess}
						addId={reportId}
					/>
				</View>
			</View>
		)
	}
}

const mapStateToProps = ({config, user}:any) => {
	return {config, user}
}

export default connect(mapStateToProps)(ReportUpload);
