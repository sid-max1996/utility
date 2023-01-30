const getAllProperties = (object: any) => {
	const properties = new Set();

	do {
		for (const key of Reflect.ownKeys(object)) {
			properties.add([object, key]);
		}
    object = Reflect.getPrototypeOf(object);
	} while (object && object !== Object.prototype);

	return Array.from(properties);
}

export const autoBind = (self: any) => {
  for (const value of getAllProperties(self.constructor.prototype)) {
    const [object, key] = value as any;
		if (key === 'constructor') {
			continue;
		}

		const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
		if (descriptor && typeof descriptor.value === 'function') {
			self[key] = self[key].bind(self);
		}
	}
}
