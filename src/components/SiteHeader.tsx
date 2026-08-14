import LanguageSwitcher from "./LanguageSwitcher";

// Theo yêu cầu: ẩn các mục menu; tên site ở góc trái cũng đã xoá (yêu cầu khách 2026-08-14)
// → header chỉ còn nút chuyển ngôn ngữ, căn phải.
export default async function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1120px] items-center justify-end px-5 py-3.5 md:px-8">
        <LanguageSwitcher />
      </div>
    </header>
  );
}
