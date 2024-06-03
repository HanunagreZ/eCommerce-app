import Loading from '../components/Loading/Loading';

export async function loadingDecorator(callback: () => void) {
  const loading = new Loading();
  await callback();
  loading.remove();
}
