import random

# --- BASES DE DATOS DEL JUEGO ---
EQUIPOS_FPC = [
    "América de Cali", "Atlético Bucaramanga", "Atlético Huila", "Atlético Nacional",
    "Cortuluá", "Deportes Quindío", "Deportes Tolima", "Deportivo Cali",
    "Deportivo Pereira", "Envigado F.C.", "Independiente Medellín", 
    "Independiente Santa Fe", "Junior de Barranquilla", "Millonarios",
    "Once Caldas", "Unión Magdalena"
]

VARIANTES_COLOMBIA = ["Colombia (96)", "Colombia 90", "Super C"]

RESTO_SELECCIONES = [
    "Argentina", "Bolivia", "Brasil", "Chile", "Ecuador", "Paraguay", 
    "Perú", "Uruguay", "Venezuela", "México", "Estados Unidos"
]

ISSS = [
    "Alemania", "Argentina", "Austria", "Bélgica", "Bulgaria", 
    "Camerún", "Colombia", "Corea del Sur", "Dinamarca", "Escocia", 
    "España", "Estados Unidos", "Francia", "Gales", "Grecia", 
    "Inglaterra", "Irlanda", "Irlanda del Norte", "Italia", "Japón", 
    "Marruecos", "México", "Nigeria", "Noruega", "Países Bajos", 
    "Polonia", "Portugal", "Rumania", "Rusia", "Suecia", 
    "Suiza", "Turquía", "Uruguay"
]

CLUBES_INTERNACIONALES = [
    "Boca Juniors", "River Plate", "Juventus", "Peñarol", "Real Madrid", "Barcelona"
]


def obtener_fpc(cantidad_total):
    """Selecciona a Santa Fe de primero y completa con rivales del FPC al azar."""
    disponibles = EQUIPOS_FPC.copy()
    disponibles.remove("Independiente Santa Fe")
    
    rivales = random.sample(disponibles, cantidad_total - 1)
    return ["Independiente Santa Fe"] + rivales

def obtener_selecciones(cantidad_total):
    """Selecciona países al azar asegurando que como máximo aparezca UNA sola Colombia."""
    pool_final = RESTO_SELECCIONES.copy()
    
    if random.choice([True, False]):
        colombia_elegida = random.choice(VARIANTES_COLOMBIA)
        pool_final.append(colombia_elegida)
    
    return random.sample(pool_final, cantidad_total)

def obtener_isss(cantidad_total):
    """Selecciona equipos de la base ISSS asegurando que como máximo aparezca UNA sola Colombia."""
    pool_final = ISSS.copy()
    
    if random.choice([True, False]):
        colombia_elegida = random.choice(VARIANTES_COLOMBIA)
        pool_final.append(colombia_elegida)
    
    return random.sample(pool_final, cantidad_total)

def obtener_mundial_clubes(cantidad_total):
    """Modo Mundial de Clubes: Combinación fija/azar de Internacionales y FPC (con Santa Fe)."""
    colombianos = obtener_fpc(2)
    
    if cantidad_total == 6:
        internacionales = random.sample(CLUBES_INTERNACIONALES, 4)
    else:
        internacionales = CLUBES_INTERNACIONALES.copy()
        random.shuffle(internacionales)
        
    return colombianos + internacionales

def obtener_total_random(cantidad_total):
    """
    Modo Total Random: Junta FPC, Internacionales y Selecciones en una sola bolsa.
    Mantiene la regla de filtrar las Colombias para que no se crucen entre sí.
    """
    # 1. Agregamos todos los clubes (FPC e Internacionales)
    bolsa_completa = EQUIPOS_FPC + CLUBES_INTERNACIONALES
    
    # 2. Agregamos las selecciones del resto de América y la base ISSS
    bolsa_completa += RESTO_SELECCIONES + ISSS
    
    # 3. Decidimos si entra una de las Colombias a la bolsa general
    if random.choice([True, False]):
        bolsa_completa.append(random.choice(VARIANTES_COLOMBIA))
        
    # 4. Sorteamos completamente al azar la cantidad de equipos requerida
    return random.sample(bolsa_completa, cantidad_total)

def mostrar_lista_equipos(tipo_torneo, nombre_modalidad, cantidad):
    """Obtiene y muestra la lista final en formato numerado"""
    print("\n" + "="*45)
    print(f"📋 EQUIPOS PARA: {nombre_modalidad.upper()} ({tipo_torneo.upper()})")
    print("="*45)
    
    if tipo_torneo == "FPC":
        equipos = obtener_fpc(cantidad)
    elif tipo_torneo == "Mundial de Clubes":
        equipos = obtener_mundial_clubes(cantidad)
    elif tipo_torneo == "Total Random":
        equipos = obtener_total_random(cantidad)
    elif tipo_torneo == "ISSS":
        equipos = obtener_isss(cantidad)
    else:
        equipos = obtener_selecciones(cantidad)
    
    for i, equipo in enumerate(equipos, start=1):
        print(f"{i}. {equipo}")
    print(f"\nTotal: {cantidad} equipos seleccionados con éxito.")

# --- MENÚ DE SELECCIÓN INTERACTIVO ---
if __name__ == "__main__":
    while True:
        print("\n" + "═"*45)
        print(" 🎮 SORTEO DE EQUIPOS - FÚTBOL COLOMBIANO 96 🎮")
        print("═"*45)
        print("1. Jugar con Clubes del FPC (Santa Fe Incluido)")
        print("2. Jugar con Selecciones Americanas (Al azar)")
        print("3. Jugar con Selecciones ISSS (SNES)")
        print("4. Mundial de Clubes (Internacionales + FPC)")
        print("5. Total Random (¡Caos absoluto!) 🎲")
        print("6. Salir")
        print("═"*45)
        
        opcion_tipo = input("Selecciona una categoría (1-6): ").strip()
        
        if opcion_tipo == "6":
            print("\n¡Listo! Saliendo del sorteo... 🕹️")
            break
            
        if opcion_tipo in ["1", "2", "3", "4", "5"]:
            if opcion_tipo == "1":
                tipo = "FPC"
            elif opcion_tipo == "2":
                tipo = "Selecciones"
            elif opcion_tipo == "3":
                tipo = "ISSS"
            elif opcion_tipo == "4":
                tipo = "Mundial de Clubes"
            else:
                tipo = "Total Random"
            
            # Submenú para elegir el tamaño del torneo
            print("\n" + "─"*45)
            print(f" ¿Qué tipo de torneo vas a armar con {tipo}?")
            print("─"*45)
            print("1. Liga Corta (6 Equipos)")
            print("2. Torneo Relámpago (8 Equipos)")
            print("3. Volver al menú principal")
            print("─"*45)
            
            opcion_tamano = input("Selecciona el tamaño (1-3): ").strip()
            
            if opcion_tamano == "1":
                mostrar_lista_equipos(tipo, "Liga Corta", 6)
            elif opcion_tamano == "2":
                mostrar_lista_equipos(tipo, "Torneo Relámpago", 8)
            elif opcion_tamano == "3":
                continue
            else:
                print("\n❌ Tamaño no válido. Volviendo al menú principal.")
        else:
            print("\n❌ Opción no válida. Por favor, marca una opción del 1 al 6.")
