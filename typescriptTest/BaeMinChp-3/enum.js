var Language;
(function (Language) {
    Language[Language["Typescript"] = 0] = "Typescript";
    Language[Language["Javascript"] = 1] = "Javascript";
    Language[Language["Java"] = 2] = "Java";
    Language["Python"] = "Python";
    Language[Language["Kotlin"] = 300] = "Kotlin";
    Language[Language["Rust"] = 301] = "Rust";
})(Language || (Language = {}));
var ItemStatusType;
(function (ItemStatusType) {
    ItemStatusType["HOLd"] = "HOLD";
    ItemStatusType["READY"] = "READY";
    ItemStatusType["DELIVERING"] = "DELIVERING";
    ItemStatusType["DELIVERED"] = "DELIVERED";
})(ItemStatusType || (ItemStatusType = {}));
var checkItemAvailable = function (itemStatus) {
    switch (itemStatus) {
        case ItemStatusType.HOLd:
        case ItemStatusType.READY:
        case ItemStatusType.DELIVERING:
            return false;
        case ItemStatusType.DELIVERED:
            defalut: return true;
    }
};
var NUM;
(function (NUM) {
    NUM[NUM["ONE"] = 1] = "ONE";
    NUM[NUM["TWO"] = 2] = "TWO";
    NUM[NUM["THREE"] = 3] = "THREE";
})(NUM || (NUM = {}));
var notMyNumber = 100; //'100' 형식은 'NUMBER' 형식에 할당할 수 없습니다.ts(2322)
var myNumber = 100; //'100' 형식은 'NUMBER' 형식에 할당할 수 없습니다.ts(2322)
var myStringNum = 'THREE'; //'"THREE"' 형식은 'STRING_NUMBER' 형식에 할당할 수 없습니다.ts(2322)
