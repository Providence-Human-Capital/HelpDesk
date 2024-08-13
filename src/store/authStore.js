import { persist, createJSONStorage } from "zustand/middleware";
import { create } from 'zustand'

export const useAuthStore = create(
    persist(
        (set) => ({
            auth: {
                user: {
                    username: '',
                    email: '',
                    isAuth: false,
                    role: '',
                }
            },
            addAuthUser: (user) => set((state) => ({ auth: { ...state.auth, user } })),
            logoutAuthUser: () => set({
                auth: {
                    user: {
                        username: '',
                        email: '',
                        isAuth: false,
                        role: '',
                    }
                }
            }),
        }),
        {
            name: 'auth-store',
            storage: createJSONStorage(() => localStorage),
        },
    )
)

