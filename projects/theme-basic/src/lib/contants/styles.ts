export default `
body {
  background-color: red;
}
.modal.show {
  overflow-x: visible !important;
  overflow-y: visible !important;
}

.modal-content {
  height: 70%;
}

.modal-body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-dialog {
  height: 100%;
}

.mat-drawer-content {
  height: calc(100% - 60px);
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
.row {
  margin: 0;
  padding: 5px;
}

.entry-row {
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

.mat-list-item.active {
  color: #1b9aee;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.04);
}

.mat-list-item:hover {
  color: #1b9aee;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.04);
}

.card {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
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
  padding: 30px 30px 0 30px;
  margin-bottom: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 0;
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
