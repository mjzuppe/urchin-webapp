export const templatesList = (templates: any) => {
  let templateList = [...templates.templates]
  const editedTemplates = [...templates.edited || []]

  templateList.forEach((originalTemplate: { publicKey: any; }, originalIndex: number) => {
    editedTemplates.forEach((editedTemplate: { publicKey: any; }) => {
      if(originalTemplate.publicKey === editedTemplate.publicKey) {
        templateList.splice(originalIndex, 1, editedTemplate);
      }
    });
  });

  return [...templateList, ...templates.new]
}