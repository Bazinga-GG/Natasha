<template>
  <div>
    <marvel-button :ref="id4Btn"
                   :size="btnSize"
                   :label="btnName"
                   :icon="btnIcon"
                   :isWarn="false"
                   v-on:onClick="onClickBtn"></marvel-button>
    <input v-show="false" type="file" :multiple="isMulti? 'multiple' : undefined" @change="onSelectFile" :accept="acceptFormat"/>
  </div>
</template>

<script>
  import MarvelButton from "../btn/MarvelButton"
  import StringUtilsEx from '../../component/str'

  /**
   *  MarvelUploadSimple widget description
   *  @vuedoc
   *  @exports MarvelUploadSimple
   */
  export default {
    name: "MarvelUploadSimple",
    components: {
      MarvelButton
    },
    props: {
      btnSize: {
        type: String,
        default: "normal",
        required: false,
      },
      btnIcon: {
        type: String,
        default: "icon-upload2",
        required: false,
      },
      btnName: {
        type: String,
        default: "Upload",
        required: false,
      },
      isMulti: {
        type: Boolean,
        default: false,
        required: false,
      },
      accept: {
        type: Array,
        default: function () {
          return [];
        },
        required: false,
      },
    },
    data() {
      return {
        id4Btn: StringUtilsEx.uuid(),
        acceptFormat:""
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function(){
        this.acceptFormat = "";
        for(var i = 0; i < this.accept.length; i++){
          if(i == 0){
            this.acceptFormat =this.accept[i];
          }else{
            this.acceptFormat = this.acceptFormat + "," + this.accept[i];
          }
        }
      },

      //#endregion

      onClickBtn() {
        this._clearFileVaule();
        let elements = this.$el.getElementsByTagName("input");
        if (elements.length) {
          elements[0].click();
        }
      },
      onSelectFile(oEvent) {
        let arrFile = oEvent.target.files;
        if (arrFile.length) {
          var oFile;
          if (this.isMulti) {
            oFile = arrFile;
          } else {
            oFile = arrFile[0];
          }
          this.callback4OnUploadFile(oFile);
        }
      },
      _clearFileVaule() {
        let elements = this.$el.getElementsByTagName("input");
        if (elements.length) {
          elements[0].value = "";
        }
      },

      //#endregion
      //#region callback

      callback4OnUploadFile: function (oFile) {
        this.$emit("onUploadFile", oFile);
      },

      //#endregion
      //#region 3rd

      setBtnDisable: function (bIsDisable) {
        this.$refs[this.id4Btn].setBtnDisable(bIsDisable);
      }

      //#endregion
    },
    watch: {
      accept: {
        handler: function () {
          this._initEx();
        },
        deep: true
      }
    },
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

</style>
