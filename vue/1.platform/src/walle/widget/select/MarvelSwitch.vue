<template>
  <!--checkBoxSlide start-->
  <div class="checkBoxSlideWrapper" :title="title">
    <div class="checkBoxSlide">
      <input type="checkbox" v-bind:id="[id]" v-model="checkItem"
             :disabled="isDisable"/>
      <label v-bind:for="[id]"></label>
    </div>
  </div>
  <!--checkBoxSlide end-->
</template>

<script>
  /**
   *  MarvelSwitch widget description
   *  @vuedoc
   *  @exports MarvelSwitch
   */
  export default {
    name: 'MarvelSwitch',
    props: {
      id: {
        type: String,
        default: "",
        required: true,
      },
      check: {
        type: Boolean,
        default: true,
        required: false,
      },
      buObj: {
        type: [String, Object, Array],
        default: undefined,
        required: false,
      },
      title: {
        type: String,
        default: "",
        required: false,
      },
    },
    data: function () {
      return {
        checkItem: this.check === false ? false : true,
        isDisable: false,
      }
    },
    methods: {
      //#region inner
      //#endregion
      //#region callback

      callback4OnChange: function (strOldVal, strNewVal, buObj) {
        this.$emit("onChange", strOldVal, strNewVal, buObj);
      },

      //#endregion
      //#region 3rd

      setStatus: function (bIsCheck, bIsDisable) {
        this.checkItem = bIsCheck;
        this.isDisable = bIsDisable;
      },
      getCheckItem: function () {
        return this.checkItem;
      },
      setDisable: function (bIsDisable) {
        this.isDisable = bIsDisable;
      },

      //#endregion
    },
    watch: {
      checkItem: function (strNewVal, strOldVal) {
        this.callback4OnChange(strOldVal, strNewVal, this.buObj);
      }
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
  * {
    box-sizing: border-box
  }

  .checkBoxSlideWrapper {
    display: inline-block;
  }

  .checkBoxSlideWrapper .checkBoxSlide {
    width: 38px;
    height: 20px;
    position: relative;
  }

  .checkBoxSlideWrapper .checkBoxSlide input[type=checkbox] {
    /*pos*/
    margin: 0;
    padding: 0;
    /*style*/
    visibility: hidden;
  }

  .checkBoxSlideWrapper .checkBoxSlide input[type=checkbox]:checked + label:after {
    /*pos*/
    /*style*/
    left: 18px;
    top: -2px;
    border: 1px solid #3dcca6;
  }

  .checkBoxSlideWrapper .checkBoxSlide input[type=checkbox]:checked + label {
    /*pos*/
    height: 16px;
    top: 2px;
    /*style*/
    background: #3dcca6;
    border: none;
  }

  .checkBoxSlideWrapper .checkBoxSlide input[type=checkbox]:disabled + label:after {
    /*pos*/
    /*style*/
    border: 1px solid #ccc;
  }

  .checkBoxSlideWrapper .checkBoxSlide input[type=checkbox]:disabled + label {
    /*pos*/
    /*style*/
    background: #e2e2e2;
    pointer-events: none;
  }

  .checkBoxSlideWrapper .checkBoxSlide label {
    /*pos*/
    width: 38px;
    height: 4px;
    position: absolute;
    top: 8px;
    left: 0;
    /*style*/
    background-color: #666;
    border-radius: 20px;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }

  .checkBoxSlideWrapper .checkBoxSlide label:hover {
    background-color: #999;
  }

  .checkBoxSlideWrapper .checkBoxSlide label:after {
    /*pos*/
    width: 18px;
    height: 18px;
    position: absolute;
    top: -8px;
    left: 0px;
    border-radius: 100%;
    content: "";
    /*style*/
    cursor: pointer;
    border: 1px solid #666;
    background-color: #fff;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }
</style>
