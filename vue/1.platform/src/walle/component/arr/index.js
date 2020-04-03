export default {
  //#region add

  upsert4Normal: function (iItem, arrRes) {
    if (arrRes.indexOf(iItem) == -1) {
      arrRes.push(iItem);
    }
  },

  addToFirst: function (oItem, arrRes) {
    arrRes.unshift(oItem);
  },

  addToLast: function (oItem, arrRes) {
    arrRes.push(oItem);
  },

  //#endregion

  //#region del

  deleteBatchByIndexLst: function (lstIndex, arrRes) {
    for (var i = 0; i < lstIndex.length; i++) {
      var iIndex = lstIndex[i];
      this.deleteByIndex(iIndex, arrRes);
    }
  },

  deleteByIndex: function (iIndex, arrRes) {
    arrRes.splice(iIndex, 1);
  },

  deleteItem4Normal: function (iItem, arrRes) {
    var iItemIndex = this.indexOf4Normal(iItem, arrRes);
    if (iItemIndex != -1) {
      this.deleteByIndex(iItemIndex, arrRes);
    }
  },

  deleteItem4Obj: function (strBuId, arrRes) {
    var iItemIndex = -1;
    for (var i = 0; i < arrRes.length; i++) {
      var oItem = arrRes[i];
      if (oItem.buId == strBuId) {
        iItemIndex = i;
        break;
      }
    }

    if (iItemIndex != -1) {
      this.deleteByIndex(iItemIndex, arrRes);
    }
  },

  deleteLstItemByBuId: function (strBuId, arrRes) {
    var iItemIndex = -1;
    for (var i = 0; i < arrRes.length; i++) {
      var oRes = arrRes[i];
      if (oRes.buId == strBuId) {
        iItemIndex = i;
        break;
      }
    }

    if (iItemIndex != -1) {
      this.deleteByIndex(iItemIndex, arrRes);
    }
  },

  //#endregion

  //#region update

  toStrWithSplit4Normal: function (arrSrc, strSplitStr) {
    var strRes = "";

    for (var i = 0; i < arrSrc.length; i++) {
      strRes += arrSrc[i];
      if (i != arrSrc.length - 1) {
        strRes += strSplitStr;
      }
    }

    return strRes;
  },

  toArrWithSplit4Normal: function (strMsg, strSplitStr) {
    var arrRes = strMsg.split(strSplitStr);
    return arrRes;
  },

  subArray: function (iLength, arrRes) {
    var arrSub = [];

    for (var i = 0; i < iLength; i++) {
      arrSub.push(arrRes[i]);
    }

    return arrSub;
  },

  mergeArr4Normal: function (arr1, arr2) {
    var arrNew = [];

    for (var i = 0; i < arr1.length; i++) {
      this.upsert4Normal(arr1[i], arrNew);
    }

    for (var j = 0; j < arr2.length; j++) {
      this.upsert4Normal(arr2[j], arrNew);
    }

    return arrNew;
  },

  distinctArr4Normal: function (arrSrc) {
    var arrDst = [];

    for (var i = 0; i < arrSrc.length; i++) {
      this.upsert4Normal(arrSrc[i], arrDst);
    }

    return arrDst;
  },

  //#endregion

  //#region get

  isContain4Normal: function (iItem, arrRes) {
    return arrRes.indexOf(iItem) != -1;
  },

  isContain4Obj: function (strBuId, arrRes) {
    for (var i = 0; i < arrRes.length; i++) {
      var oItem = arrRes[i];

      if (strBuId == oItem.buId) {
        return true;
      }
    }
    return false;
  },

  indexOf4Normal: function (iItem, arrRes) {
    return arrRes.indexOf(iItem);
  },

  indexOf4Obj: function (strBuId, arrRes) {
    for (var i = 0; i < arrRes.length; i++) {
      var oItem = arrRes[i];

      if (strBuId == oItem.buId) {
        return i;
      }
    }
    return -1;
  },

  getOne4Normal: function (iItem, arrRes) {
    if (this.isContain4Normal(iItem, arrRes)) {
      return arrRes[arrRes.indexOf(iItem)];
    } else {
      return undefined;
    }
  },

  getOne4Obj: function (strBuId, arrRes) {
    for (var i = 0; i < arrRes.length; i++) {
      var oItem = arrRes[i];

      if (strBuId == oItem.buId) {
        return oItem;
      }
    }
    return undefined;
  },

  getLst4Obj: function (strBuId, arrRes) {
    var arrItem = [];

    for (var i = 0; i < arrRes.length; i++) {
      var oItem = arrRes[i];

      if (strBuId == oItem.buId) {
        arrItem.push(oItem);
      }
    }

    return arrItem;
  },

  //#endregion
}
