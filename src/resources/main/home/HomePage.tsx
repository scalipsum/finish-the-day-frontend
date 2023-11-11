import { useEffect } from 'react'

const HomePage = () => {
  useEffect(() => {
    const getData = async () => {
      // const { data } = await supabase
      //   .from('todo')
      //   .select('id, body, is_completed, day (name), category (name)')
      //
      // const { data } = await supabase
      //   .from('days_categories')
      //   .select('day !inner(name), category (name)')
      //   .eq('day.name', 'monday')
      // console.log(data)
    }
    getData()
    // eslint-disable-next-line
  }, [])

  return <div>HomePage</div>
}

export default HomePage
