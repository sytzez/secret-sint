import { useEffect } from 'react'
import Pepernoten from '../vfx/pepernoten'

export default function usePepernoten() {
  useEffect(() => {
    const pepernoten = new Pepernoten(document.body)

    pepernoten.start()

    return () => pepernoten.stop()
  })
}
