export function extractMainCodeBlock(text) {
  const blocks = Array.from(text.matchAll(/```(?:jsx|js|tsx)?\n([\s\S]*?)```/g));
  const components = [];

  blocks.forEach((block) => {
    const code = block[1].trim();
    const match = code.match(/export default (\w+)/);
    const componentName = match?.[1] || null;
    components.push({ code, componentName });
  });

  return { components };
}
