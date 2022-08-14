export interface ChinaAdd {
	nowConfirm: number;
	suspect: number;
	noInfect: number;
	localConfirm: number;
	localConfirmH5: number;
	heal: number;
	dead: number;
	nowSevere: number;
	importedCase: number;
	noInfectH5: number;
	confirm: number;
}

export interface ShowAddSwitch {
	dead: boolean;
	nowConfirm: boolean;
	nowSevere: boolean;
	localConfirm: boolean;
	importedCase: boolean;
	noInfect: boolean;
	localinfeciton: boolean;
	all: boolean;
	confirm: boolean;
	suspect: boolean;
	heal: boolean;
}

export interface Today {
	isUpdated: boolean;
	confirm: number;
}

export interface Total {
	wzz: number;
	highRiskAreaNum: number;
	nowConfirm: number;
	confirm: number;
	heal: number;
	showHeal: boolean;
	provinceLocalConfirm: number;
	mtime: string;
	dead: number;
	showRate: boolean;
	adcode: string;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	continueDayZeroLocalConfirm: number;
}

export interface Today {
	dead_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: string|Number;
	local_confirm_add: number;
	abroad_confirm_add: number;
}

export interface Total {
	dead: number;
	highRiskAreaNum: number;
	nowConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
	mtime: string;
	adcode: string;
	showHeal: boolean;
	wzz: number;
	provinceLocalConfirm: number;
	continueDayZeroConfirmAdd: number;
	confirm: number;
	showRate: boolean;
	heal: number;
	mediumRiskAreaNum: number;
	continueDayZeroConfirm: number;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	wzz_add: string|Number;
	local_confirm_add: number;
}

export interface Total {
	adcode: string;
	showRate: boolean;
	heal: number;
	highRiskAreaNum: number;
	nowConfirm: number;
	confirm: number;
	showHeal: boolean;
	dead: number;
	mediumRiskAreaNum: number;
	mtime: string;
	continueDayZeroLocalConfirm: number;
	wzz: number;
	provinceLocalConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
}

export interface Children {
    id: string;
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
}

export interface Children {
	today: Today;
	total: Total;
	children: Children[];
	name: string;
	adcode: string;
	date: string;
}

export interface AreaTree {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface ChinaTotal {
	heal: number;
	noInfectH5: number;
	nowLocalWzz: number;
	deadAdd: number;
	mediumRiskAreaNum: number;
	nowConfirm: number;
	localConfirm: number;
	mRiskTime: string;
	confirm: number;
	dead: number;
	suspect: number;
	nowSevere: number;
	noInfect: number;
	showlocalinfeciton: number;
	confirmAdd: number;
	mtime: string;
	showLocalConfirm: number;
	localConfirmH5: number;
	localWzzAdd: number;
	localConfirmAdd: number;
	highRiskAreaNum: number;
	importedCase: number;
	local_acc_confirm: number;
}

export interface Diseaseh5Shelf {
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
}

export interface LocalCityNCOVDataList {
	date: string;
	isUpdated: boolean;
	mtime: string;
	local_confirm_add: number;
	local_wzz_add: string;
	highRiskAreaNum: number;
	isSpecialCity: boolean;
	city: string;
	adcode: string;
	mediumRiskAreaNum: number;
	province: string;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
	localCityNCOVDataList: LocalCityNCOVDataList[];
}

export interface RootObject {
	ret: number;
	info: string;
}