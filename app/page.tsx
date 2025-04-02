import ReflexChecker from "../components/ReflexChecker";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <img src="/logo.png" alt="스포츠토토 로고" className="w-48 mb-6" />
      <ReflexChecker />
    </main>
  );
}
