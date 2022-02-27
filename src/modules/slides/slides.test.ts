import Slides from './Slides';

const slides = Slides.create([1, 2, 3]);

afterEach(() => {
  slides.reset();
});

test('slides next', async () => {
  expect(slides.current).toBe(1);
  expect(slides.position).toBe(0);
  let slide = slides.next();
  expect(slide).toBe(1);
  expect(slides.current).toBe(2);
  expect(slides.position).toBe(1);
  slide = slides.next();
  expect(slide).toBe(2);
  expect(slides.current).toBe(3);
  expect(slides.position).toBe(2);
  slide = slides.next();
  expect(slide).toBe(3);
  expect(slides.current).toBe(1);
  expect(slides.position).toBe(0);
  slide = slides.next();
  expect(slide).toBe(1);
  expect(slides.current).toBe(2);
  expect(slides.position).toBe(1);
  slide = slides.next();
  expect(slide).toBe(2);
  expect(slides.current).toBe(3);
  expect(slides.position).toBe(2);
  slide = slides.next();
  expect(slide).toBe(3);
  expect(slides.current).toBe(1);
  expect(slides.position).toBe(0);
});

test('slides set', async () => {
  slides.set(1);
  let slide = slides.next();
  expect(slide).toBe(2);
  slide = slides.next();
  expect(slide).toBe(3);
  slides.set(0);
  expect(slides.current).toBe(1);
});
