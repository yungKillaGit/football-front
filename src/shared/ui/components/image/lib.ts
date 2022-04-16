function requireAll(requireContext: any) {
  return requireContext.keys().reduce((acc: any, fileName: string) => {
    const glyph = fileName
      .replace(/^.*[\\/]/, '')
      .replace(/\.[^/.]+$/, '');
    return { ...acc, [glyph]: requireContext(fileName) };
  }, {});
}

export const imageAssets = requireAll(require.context('../../../assets/images', false, /\.(png|jpe?g|svg)$/));
