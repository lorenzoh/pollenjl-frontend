const dev = process.env.NODE_ENV === 'development';

export const BASE: string = dev ? '' : '/DataLoaders.jl/test';
export const ASSETS = dev ? '' : '/DataLoaders.jl/test';
export const DOCUMENTS = dev ? 'pollendata' : '/DataLoaders.jl/test/pollendata';