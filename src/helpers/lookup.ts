
// helper function for cases when we need to map all templates and entries at the same time
export const mapTemplateAndEntryData = (entries: any, templates: any) => {
  // templates.map(template => {
  //   let templateEntries = entries.filter(entry => {
  //     return entry.template == template.publicKey
  //   })

  //   let templateTextInput = template.inputs.filter(input => input.type === "text") ? template.inputs.filter(input => input.type === "text")[0] : null
  //   let entriesInputs = templateEntries.map(entry => entry.inputs).flat()

  //   let entryResult = entriesInputs.map(input => {
  //     return {
  //       ...input, 
  //       name: input[templateTextInput.label]
  //     }
  //   })

  //   return entryResult
  // })
}

export const loadTemplateInputData = (entryInputs: any, templateInputs: any) => {
  let templateTextInput = templateInputs.filter((input: { type: any }) => input.type === "text")[0]

  let entryWithName = {}

  if(templateTextInput !== undefined) {
    entryWithName = entryInputs.filter((input: { [x: string]: null }) => {
      return input[templateTextInput.label] !== null
    })
  }

  return {
    entryInputData: {...entryWithName}, 
    templateInputData:{...templateTextInput}
  }
}