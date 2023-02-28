package main

import "server/initialize"

func main() {
	initialize.Mysql()

	initialize.Router()
}
