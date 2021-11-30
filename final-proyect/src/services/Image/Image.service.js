const url_base = "https://picsum.photos/";

export const imageServices = {
    getImageRandom: (size = {}) => {
      const { width = 0, height  = 0} = size
      const img = `${url_base}${width}/${height}`
      return img;
    }
  };