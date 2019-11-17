<template>
  <div class="uploadWrapper" v-bind:class="[status, size]">
    <input class="uploadFile" type="file" v-on:change="onSelectFileBtnClick">
    <input class="uploadFileName" readonly="readonly" disabled type="text"
           :placeholder="placeHolder" :value="fileName">
    <span class="uploadFileSelectBtn">...</span>
    <div class="errorTip icon-notification">{{ errMsg }}</div>
  </div>
</template>

<script>
  /**
   *  MarvelUpload widget description
   *  @vuedoc
   *  @exports MarvelUpload
   */
  export default {
    name: 'MarvelUpload',
    props: {
      placeHolder: {
        type: String,
        default: "",
        required: false,
      },
      status: {
        type: String,
        default: "",
        required: false,
      },
      errMsg: {
        type: String,
        default: "",
        required: false,
      },
      size: {
        type: String,
        default: "",
        required: false,
      },
    },
    data: function () {
      return {
        file: undefined,
        fileName: ""
      }
    },
    methods: {
      //#region inner

      onSelectFileBtnClick: function (evt) {
        this.file = evt.target.files[0];
        this.fileName = this.file.name;
        this.callback4OnSelectFileBtnClick(this.file);
      },

      //#endregion
      //#region callback

      callback4OnSelectFileBtnClick: function (oFile) {
        this.$emit("onSelectFileBtnClick", oFile);
      },

      //#endregion
      //#region 3rd

      getFile: function () {
        return this.file;
      },
      clearCache: function () {
        this.file = undefined;
        this.fileName = "";
      }

      //#endregion
    }
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/
  .uploadWrapper {
    width: 100%;
    height: 32px;
    border: 1px solid #cccccc;
    box-sizing: border-box;
    position: relative;
    border-radius: 2px;
  }

  .uploadWrapper .uploadFile {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    border: none;
    background-color: transparent;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
  }

  .uploadWrapper .uploadFileName {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 30px);
    height: 30px;
    border: none;
    background-color: transparent;
    padding: 0 10px;
    box-sizing: border-box;
    color: #666;
  }

  .uploadWrapper .uploadFileSelectBtn {
    width: 30px;
    height: 30px;
    top: 0;
    right: 0;
    position: absolute;
    line-height: 18px;
    text-align: center;
    color: #777;
  }

  .uploadWrapper .errorTip {
    color: #ff4c4c;
    line-height: 18px;
    font-size: 14px;
    position: absolute;
    bottom: -20px;
    display: none;
  }

  .uploadWrapper .errorTip:before {
    margin-right: 10px;
  }

  .error {
    border: 1px solid #ff4c4c !important;
  }

  .error .errorTip {
    display: block;
  }

  .disable {
    background-color: #f0f0f0;
    pointer-events: none;
  }

  .mini {
    height: 22px;
  }

  .mini .uploadFile {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }

  .mini .uploadFileName {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }

  .mini .uploadFileSelectBtn {
    height: 20px;
    line-height: 10px;
  }

  /*region dark theme*/

  .dark .uploadWrapper {
    border: 1px solid #8b90b3;
  }

  .dark .uploadFile {
  }

  .dark .uploadFileName {
    color: #8b90b3;
  }

  .dark .uploadFileSelectBtn {
    color: #8b90b3;
  }

  /*region dark theme*/

</style>
