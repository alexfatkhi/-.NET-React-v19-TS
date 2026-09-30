import { render, cleanup } from "@testing-library/react"; // render = tampilkan komponen ke DOM; cleanup = bersihkan DOM
import { afterEach, expect, test } from "vitest"; // afterEach = jalankan setelah tiap test; expect = assertion; test = definisi test
import Pizza from "../Pizza"; // komponen yang diuji

afterEach(cleanup); // bersihkan DOM setelah setiap test, supaya sisa render test sebelumnya tidak mengganggu

test("alt text renders on image", () => {
  const name = "My Favorite Pizza"; // data uji: nama pizza (dipakai juga sebagai alt)
  const src = "https://picsum.photos/200"; // data uji: URL gambar
  const screen = render(
    <Pizza name={name} description="super cool pizza" image={src} /> // render Pizza dengan props tersebut
  );

  const img = screen.getByRole("img") as HTMLImageElement; // cari elemen <img> di hasil render
  expect(img.src).toBe(src); // pastikan atribut src == URL yang dikirim
  expect(img.alt).toBe(name); // pastikan atribut alt == nama pizza (penting untuk aksesibilitas)
});

test("to have default image if none is provided", () => {
  const screen = render(
    <Pizza name={"Cool Pizza"} description="super cool pizza" /> // sengaja TANPA props image
  );

  const img = screen.getByRole("img") as HTMLImageElement; // <img> tetap harus ada (pakai gambar default)
  expect(img.src).not.toBe(""); // pastikan src tidak kosong (ada fallback default)
});

//npm t .

// Ringkasan file:
// File ini menguji komponen Pizza dari sisi gambar. Ada 2 test:
// (1) atribut src & alt <img> sesuai props name/image yang dikirim (penting untuk aksesibilitas);
// (2) kalau props image tidak diberikan, <img> tetap ada dan pakai gambar default (src tidak kosong).
// afterEach(cleanup) dipakai agar DOM dibersihkan setelah tiap test.
