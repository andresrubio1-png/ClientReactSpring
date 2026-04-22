import { useState } from "react";
import * as manufacturerService from "../services/manufacturerService";

function FilterManufacturer() {
    const [country, setCountry] = useState("");
    const [data, setData] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleFilter = () => {
        if (!country.trim()) {
            alert("Ingrese un país");
            return;
        }

        manufacturerService.getAll({ country })
            .then(res => {
                setData(res.data);
                setSearched(true);
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Filtrar Fabricantes por País</h2>

            <input
                placeholder="Ej: USA, Japan, Germany..."
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />

            <button onClick={handleFilter}>Filtrar</button>

            <hr />

            {searched && data.length === 0 ? (
                <p>No se encontraron fabricantes en "{country}"</p>
            ) : (
                <ul>
                    {data.map(m => (
                        <li key={m.id}>
                            {m.id} - {m.name} - {m.country} - {m.averageLeadTime} días
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FilterManufacturer;