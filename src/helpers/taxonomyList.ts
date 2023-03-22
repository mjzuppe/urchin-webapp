export const taxonomiesList = (taxonomies: any) => {
  let taxonomyList = [...taxonomies.taxonomies]
  const editedTaxonomies = [...taxonomies.edited]

  taxonomyList.forEach((originalTaxo: { publicKey: any; }, originalIndex: number) => {
    editedTaxonomies.forEach((editedTaxo: { publicKey: any; }) => {
      if(originalTaxo.publicKey === editedTaxo.publicKey) {
        taxonomyList.splice(originalIndex, 1, editedTaxo);
      }
    });
  });

  return [...taxonomyList, ...taxonomies.new]
}