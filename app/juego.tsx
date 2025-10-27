
import { Audio } from 'expo-av';
import { useEffect, useRef, useState } from "react";
import { Animated, Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function Juego() {
    // Animación para el mensaje de ganador/empate
    const mensajeAnim = useRef(new Animated.Value(1)).current;
    // Sonidos
    const clickSound = require('../assets/sounds/click.mp3');
    const winSound = require('../assets/sounds/win.mp3');
    const drawSound = require('../assets/sounds/draw.mp3');

    // Función para reproducir sonido
    const playSound = async (soundFile) => {
        try {
            const { sound } = await Audio.Sound.createAsync(soundFile);
            await sound.playAsync();
            // Liberar recursos después de reproducir
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    sound.unloadAsync();
                }
            });
        } catch (e) {
            // Silenciar errores de sonido
        }
    };
    // Estado del tablero y turno
    const [tablero, setTablero] = useState(Array(9).fill(null));
    const [turno, setTurno] = useState('X');
    // Animaciones por celda
    const animaciones = useRef(Array(9).fill(null).map(() => new Animated.Value(1))).current;

    // Reiniciar el juego
    const reiniciarJuego = () => {
        setTablero(Array(9).fill(null));
        setTurno('X');
        animaciones.forEach(anim => anim.setValue(1));
    };

    // Manejar jugada
    const manejarJugada = (index) => {
        if (tablero[index] || calcularGanador(tablero)) return;
        const nuevoTablero = tablero.slice();
        nuevoTablero[index] = turno;
        setTablero(nuevoTablero);
        setTurno(turno === 'X' ? 'O' : 'X');
        playSound(clickSound);
        // Animación de escala
        Animated.sequence([
            Animated.timing(animaciones[index], {
                toValue: 1.2,
                duration: 120,
                useNativeDriver: true,
            }),
            Animated.timing(animaciones[index], {
                toValue: 1,
                duration: 120,
                useNativeDriver: true,
            })
        ]).start();
    };

    // Calcular ganador
    function calcularGanador(celdas) {
        const lineas = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        for (let linea of lineas) {
            const [a,b,c] = linea;
            if (celdas[a] && celdas[a] === celdas[b] && celdas[a] === celdas[c]) {
                return { ganador: celdas[a], linea };
            }
        }
        return null;
    }

    const resultado = calcularGanador(tablero);
    const ganador = resultado ? resultado.ganador : null;
    const lineaGanadora = resultado ? resultado.linea : [];
    const empate = tablero.every(cell => cell) && !ganador;

    // Sonido y animación al ganar o empatar
    useEffect(() => {
        if (ganador) {
            playSound(winSound);
            Animated.sequence([
                Animated.timing(mensajeAnim, { toValue: 1.3, duration: 200, useNativeDriver: true }),
                Animated.spring(mensajeAnim, { toValue: 1, useNativeDriver: true })
            ]).start();
        } else if (empate) {
            playSound(drawSound);
            Animated.sequence([
                Animated.timing(mensajeAnim, { toValue: 1.3, duration: 200, useNativeDriver: true }),
                Animated.spring(mensajeAnim, { toValue: 1, useNativeDriver: true })
            ]).start();
        } else {
            mensajeAnim.setValue(1);
        }
    }, [ganador, empate]);

    return (
        <View style={styles.container}>
            {/* Parte superior: info y botón reiniciar */}
            <View style={{alignItems: 'center', marginBottom: 10}}>
                <Animated.Text style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                    transform: [{ scale: mensajeAnim }],
                }}>
                    {ganador ? `Ganó: ${ganador}` : empate ? '¡Empate!' : `Turno: ${turno}`}
                </Animated.Text>
                <View style={{marginTop: 8}}>
                    <Button title="Reiniciar" onPress={reiniciarJuego} color="#22c55e" />
                </View>
            </View>
            {/* Tablero 3 en raya */}
            <View style={styles.grid}>
                {tablero.map((valor, idx) => {
                    const esGanadora = lineaGanadora.includes(idx);
                    return (
                        <Pressable
                            key={idx}
                            style={[styles.cell, esGanadora && styles.cellWinner]}
                            onPress={() => manejarJugada(idx)}
                        >
                            <Text style={[styles.cellText, valor === 'X' && styles.xText, valor === 'O' && styles.oText]}>{valor}</Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const SIZE = 96;

const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems: "center",
        padding: 24,
        gap: 20,
    },

    grid:{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
        justifyContent: "center",
        width: SIZE * 3 + 12,
        height: SIZE * 3 + 12
    },

    cell:{
        backgroundColor: "#1f2937",
        width: SIZE,
        height: SIZE,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellText: {
        color: '#fff',
        fontSize: 48,
        fontWeight: 'bold',
    },
    xText: {
        color: '#22d3ee', // celeste
        textShadowColor: '#0ea5e9',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    oText: {
        color: '#f472b6', // rosa
        textShadowColor: '#be185d',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    cellWinner: {
        backgroundColor: '#facc15', // amarillo para resaltar
        borderWidth: 2,
        borderColor: '#eab308',
    }

});