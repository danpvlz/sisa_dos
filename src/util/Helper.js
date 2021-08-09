export const toSoles=(param)=>{
    return (Number(param)).toLocaleString('en-US', { style: 'decimal', maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

