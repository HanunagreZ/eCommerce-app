import Loading from '../components/Loading/Loading';

export async function loadingDecorator(func: () => void) {
  const loading = new Loading();
  await func();
  loading.remove();
}
