export const parser = (data1, data2) => {
    const keys = new Set([...Object.keys(data1), ...Object.keys(data2)].sort())

    const diff = [...keys].map(key => {
        if (data1[key] === undefined) {
            return `+ ${key}: ${data2[key]}`;
        }
        
        if (data2[key] === undefined) {
            return `- ${key}: ${data1[key]}`;
        }

        if(data1[key] === data2[key]) {
            return `  ${key}: ${data1[key]}`
        }

        if(data1[key] !== data2[key]) {
            return `- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`
        }
    })
    
    return `{\n${diff.join('\n')}\n}`
}