import { Projection } from '@/components/live/LiveClient';
export default async function Page({params}:{params:Promise<{code:string}>}){const {code}=await params;return <Projection code={code.toUpperCase()}/>}
