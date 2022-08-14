export type DataType ={
    label:string,
    valueLabelH5:string,
    valueLabel:string,
}
const caseType :Array<DataType> = [
    {
        label:"本土现有确诊",
        valueLabelH5: "localConfirmH5",        
        valueLabel: "localConfirm",
    },
    {
        label:"现有确诊",
        valueLabelH5: "nowConfirm",        
        valueLabel: "nowConfirm",
    },
    {
        label:"累计确诊",
        valueLabelH5: "confirm",        
        valueLabel: "confirm",
    },
    {
        label:"无症状感染者",
        valueLabelH5: "noInfect",        
        valueLabel: "noInfect",
    },
    {
        label:"境外输入",
        valueLabelH5: "importedCase",        
        valueLabel: "importedCase",
    },
    {
        label:"累计死亡",
        valueLabelH5: "dead",        
        valueLabel: "dead",
    }
] 

export {
    caseType,
}