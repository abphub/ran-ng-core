export default `

.modal.show {
  overflow-x: visible !important;
  overflow-y: visible !important;
}

.modal-content {
  min-height: 20% !important;
  max-height: 70% !important;
}

.modal-body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-dialog {
  height: 100%;
  margin-top: 8%;
}

#ManageProfileWrapper {
  width: 100%;
  padding: 15px;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0;
  border-bottom-left-radius: .25rem !important;
  border-bottom-right-radius: .25rem !important;
  border: 0;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
}
abp-manage-profile {
  width: 75%;
  display: block;
  margin: auto;
}

.card-header .row .text-right {
  display: flex !important;
  justify-content: flex-end !important;
  padding-right: 0px !important;
}
.card-header .row {
  width: 100% !important;
}
.card-header .card-title {
  margin-top: 10px !important;
  margin-bottom: 0 !important;
}

.entry-row {
  margin: 0;
  padding: 5px;
  display: flex;
  align-items: center;
  height: 70px;
  background-color: #fff;
  border-top-left-radius: .25rem !important;
  border-top-right-radius: .25rem !important;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border-bottom: 1px solid #dee2e6 !important;
}

.entry-row .content-header-title {
  font-size: 1.2rem;
  margin-bottom: 0;
}

.card {
  border-radius: 0;
  border: 0;
}

.card-body {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0;
  border-bottom-left-radius: .25rem !important;
  border-bottom-right-radius: .25rem !important;
  border: 0;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
}
.card-header {
  height:70px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 0;
  border-top-left-radius: .25rem !important;
  border-top-right-radius: .25rem !important;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
}

.scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px #a6a6a6;
  background: #a6a6a6;
}

.scrollbar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px #e5e5e5;
  border-radius: 0;
  background: #e5e5e5;
}


.scrollbar {
  /*三角箭头的颜色*/
  scrollbar-arrow-color: #fff;
  /*滚动条滑块按钮的颜色*/
  scrollbar-face-color: #0099dd;
  /*滚动条整体颜色*/
  scrollbar-highlight-color: #0099dd;
  /*滚动条阴影*/
  scrollbar-shadow-color: #0099dd;
  /*滚动条轨道颜色*/
  scrollbar-track-color: #0066ff;
  /*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
  scrollbar-3dlight-color: #0099dd;
  /*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
  scrollbar-darkshadow-color: #0099dd;
  /*滚动条基准颜色*/
  scrollbar-base-color: #0099dd;
}
`;
